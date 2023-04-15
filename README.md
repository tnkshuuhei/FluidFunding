# FluidFunding - Perpetual Public Funding Protocol(PPFG)

This project is a public good funding project that will distribute fund to projects in ofrm of streams instead of lump sum. This mechanism gives balanced risk and benefit to both project and sponsors, compared to the mechanism where funding is given before the project started, or after the project started.

## Flow

1. Sponsors depositing their sponsorship funding to our pool
2. Project owner create a project in our platform
3. Projects are reviewed and given allocation based on quadratic funding formula.
4. After projects are given allocation, they can start trigger a funding stream for their project for some portion (50% for example) of the funding can are matched on.
5. In case any issues arises during the progress of the project, anyone can raise the issue by creating proposal in Snapshot.org (integrated with UMA oSnap) to stop the stream of the fund to that project, so no more money wasted on the project. If enough people votes on this proposal, a transaction to stop the stream of the fund can be performed.
6. If everthing goes well and the projects can meet all of his promise (no proposal against them), in the of the period they can claim the rest of the funding from the contract.

## Starting the project

1. Go to CurveGrid.com and use their MultiBaaS service to deploy the contract to Goerli or Polygon Mumbai (the blockchain chosen mush support Gnosis Safe, oSnap UMA, and SuperFluid)
2. Run the `yarn dev` on the `./frontend` to run the frontend.
