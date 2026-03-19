use anchor_lang::prelude::*;

declare_id!("8dEaxxxHHFCK5CSkQp8Ljg3vRJZMhpfukZFK9NaJNF9w");

#[program]
pub mod go_found_me_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
