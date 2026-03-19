use anchor_lang::prelude::*;
declare_id!("8dEaxxxHHFCK5CSkQp8Ljg3vRJZMhpfukZFK9NaJNF9w");

// Account sizing constants (used for Anchor `space = ...` when initializing the PDA).
pub const NAME_MAX_LEN: usize = 64;
pub const DESCRIPTION_MAX_LEN: usize = 512;

// 8 bytes discriminator + 32 admin pubkey + (String prefix + bytes) * 2 + u64 amount
pub const CAMPAIGN_SPACE: usize =
    8 + 32 + (4 + NAME_MAX_LEN) + (4 + DESCRIPTION_MAX_LEN) + 8;

#[account]
pub struct Campaign {
    pub admin: Pubkey,
    pub name: String,
    pub description: String,
    pub amount_donated: u64,
}

#[program]
pub mod go_found_me_dapp {
    use super::*;
    pub fn create_campaign(
        ctx: Context<Create>,
        name: String,
        description: String,
    ) -> Result<()> {
        require!(name.len() <= NAME_MAX_LEN, GoFoundMeError::NameTooLong);
        require!(
            description.len() <= DESCRIPTION_MAX_LEN,
            GoFoundMeError::DescriptionTooLong
        );

        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.admin = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let user = &mut ctx.accounts.user;

        require!(amount > 0, GoFoundMeError::InvalidAmount);

        // Only the campaign admin can withdraw.
        require!(
            campaign.admin == *user.key,
            GoFoundMeError::UnauthorizedAdmin
        );

        // Preserve rent-exempt balance.
        let rent_balance = Rent::get()?.minimum_balance(campaign.to_account_info().data_len());
        let campaign_lamports = **campaign.to_account_info().lamports.borrow();
        if campaign_lamports.saturating_sub(rent_balance) < amount {
            return Err(GoFoundMeError::InsufficientFundsForWithdrawal.into());
        }

        // Move lamports out of the campaign PDA into the admin account.
        **campaign
            .to_account_info()
            .try_borrow_mut_lamports()? -= amount;
        **user.to_account_info().try_borrow_mut_lamports()? += amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(
        init,
        payer = user,
        space = CAMPAIGN_SPACE,
        seeds = [b"CAMPAIGN".as_ref(), user.key().as_ref()],
        bump
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[error_code]
pub enum GoFoundMeError {
    #[msg("You are not the admin/owner of this campaign")]
    UnauthorizedAdmin,
    #[msg("Insufficient funds to withdraw while preserving rent-exempt balance")]
    InsufficientFundsForWithdrawal,
    #[msg("Campaign name is too long")]
    NameTooLong,
    #[msg("Campaign description is too long")]
    DescriptionTooLong,
    #[msg("Invalid amount (must be greater than 0)")]
    InvalidAmount,
}