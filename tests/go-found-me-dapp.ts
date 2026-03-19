import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GoFoundMeDapp } from "../target/types/go_found_me_dapp";
import { expect } from "chai";

describe("go-found-me-dapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.goFoundMeDapp as Program<GoFoundMeDapp>;

  it("Creates a campaign PDA and initializes fields", async () => {
    const creator = anchor.getProvider()!.wallet.publicKey;
    const [campaignPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("CAMPAIGN"), creator.toBuffer()],
      program.programId
    );

    const name = "My Campaign";
    const description = "First description";

    await program.methods
      .createCampaign(name, description)
      .accounts({
        campaign: campaignPda,
        user: creator,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const campaign = await program.account.campaign.fetch(campaignPda);

    expect(campaign.admin.toBase58()).to.eq(creator.toBase58());
    expect(campaign.name).to.eq(name);
    expect(campaign.description).to.eq(description);
    // Rust field is `amount_donated`; Anchor IDL turns it into `amountDonated`.
    expect((campaign as any).amountDonated.toString()).to.eq("0");
  });

  it("Allows admin to withdraw lamports while preserving rent-exempt balance", async () => {
    const creator = anchor.getProvider()!.wallet.publicKey;
    const [campaignPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("CAMPAIGN"), creator.toBuffer()],
      program.programId
    );

    const name = "Withdraw Campaign";
    const description = "Top up and withdraw";

    // If the PDA already exists from the previous test run, re-creating would fail.
    // So we try create, and ignore errors if it's already initialized.
    try {
      await program.methods
        .createCampaign(name, description)
        .accounts({
          campaign: campaignPda,
          user: creator,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
    } catch (e) {
      // ignore
    }

    const CAMPAIGN_SIZE = 632; // must match `CAMPAIGN_SPACE` in Rust
    const rentExempt = await program.provider.connection.getMinimumBalanceForRentExemption(
      CAMPAIGN_SIZE
    );

    const extraDeposit = 2_000_000; // lamports
    const campaignBalBeforeDeposit = await program.provider.connection.getBalance(campaignPda);

    // Fund the campaign PDA with extra lamports so withdrawal is possible.
    const depositIx = anchor.web3.SystemProgram.transfer({
      fromPubkey: creator,
      toPubkey: campaignPda,
      lamports: extraDeposit,
    });
    const tx = new anchor.web3.Transaction().add(depositIx);
    await (program.provider as anchor.AnchorProvider).sendAndConfirm(tx, []);

    const campaignBalAfterDeposit = await program.provider.connection.getBalance(campaignPda);
    expect(campaignBalAfterDeposit - campaignBalBeforeDeposit).to.eq(extraDeposit);

    const campaignBalNow = campaignBalAfterDeposit;
    const withdrawable = campaignBalNow - rentExempt;
    expect(withdrawable).to.be.greaterThan(0);

    const amountToWithdraw = Math.min(withdrawable, 500_000);

    await program.methods
      .withdraw(new anchor.BN(amountToWithdraw))
      .accounts({
        campaign: campaignPda,
        user: creator,
      })
      .rpc();

    const campaignBalAfterWithdraw = await program.provider.connection.getBalance(campaignPda);
    expect(campaignBalAfterWithdraw).to.eq(campaignBalAfterDeposit - amountToWithdraw);
    expect(campaignBalAfterWithdraw).to.be.at.least(rentExempt);
  });

  it("Allows donating SOL and updates campaign amountDonated", async () => {
    const donor = anchor.getProvider()!.wallet.publicKey;
    const [campaignPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("CAMPAIGN"), donor.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .createCampaign("Donate Campaign", "Donation flow")
        .accounts({
          campaign: campaignPda,
          user: donor,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
    } catch (e) {
      // ignore if it already exists
    }

    const donation = 300_000;
    const campaignBefore = await program.account.campaign.fetch(campaignPda);
    const donatedBefore = Number((campaignBefore as any).amountDonated.toString());
    const balanceBefore = await program.provider.connection.getBalance(campaignPda);

    await program.methods
      .donate(new anchor.BN(donation))
      .accounts({
        campaign: campaignPda,
        user: donor,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const campaignAfter = await program.account.campaign.fetch(campaignPda);
    const donatedAfter = Number((campaignAfter as any).amountDonated.toString());
    const balanceAfter = await program.provider.connection.getBalance(campaignPda);

    expect(donatedAfter - donatedBefore).to.eq(donation);
    expect(balanceAfter - balanceBefore).to.eq(donation);
  });
});
