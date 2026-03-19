use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

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
    pub fn create_campaign(ctx: Context<Create>, name: String, description: String) -> ProgramResult {
        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.admin = *ctx.accounts.user.key;
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