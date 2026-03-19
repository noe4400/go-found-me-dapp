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
});
