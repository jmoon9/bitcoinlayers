import type { Infrastructure } from "@/components/infrastructure/infrastructureProps";
import astriaJson from "../content/infrastructures/astria.json" assert { type:
    "json" };

const astria: Infrastructure = astriaJson as Infrastructure;
import availJson from "../content/infrastructures/avail.json" assert { type:
    "json" };
const avail: Infrastructure = availJson as Infrastructure;
import bvmJson from "../content/infrastructures/bvm.json" assert { type:
    "json" };
const bvm: Infrastructure = bvmJson as Infrastructure;
import celestiaJson from "../content/infrastructures/celestia.json" assert { type:
    "json" };
const celestia: Infrastructure = celestiaJson as Infrastructure;
import espressoJson from "../content/infrastructures/espresso.json" assert { type:
    "json" };
const espresso: Infrastructure = espressoJson as Infrastructure;
import lorenzoJson from "../content/infrastructures/lorenzo.json" assert { type:
    "json" };
const lorenzo: Infrastructure = lorenzoJson as Infrastructure;
import sovereignJson from "../content/infrastructures/sovereign.json" assert { type:
    "json" };
const sovereign: Infrastructure = sovereignJson as Infrastructure;
import nubitJson from "../content/infrastructures/nubit.json" assert { type:
    "json" };
const nubit: Infrastructure = nubitJson as Infrastructure;
import babylonJson from "../content/infrastructures/babylon.json" assert { type:
    "json" };
const babylon: Infrastructure = babylonJson as Infrastructure;
import fedimintJson from "../content/infrastructures/fedimint.json" assert { type:
    "json" };
const fedimint: Infrastructure = fedimintJson as Infrastructure;
import dlclinkJson from "../content/infrastructures/dlclink.json" assert { type:
    "json" };
const dlclink: Infrastructure = dlclinkJson as Infrastructure;
import boolJson from "../content/infrastructures/bool.json" assert { type:
    "json" };
const bool: Infrastructure = boolJson as Infrastructure;
import cashuJson from "../content/infrastructures/cashu.json" assert { type:
    "json" };
const cashu: Infrastructure = cashuJson as Infrastructure;
import tbtcJson from "../content/infrastructures/tbtc.json" assert { type:
    "json" };
const tbtc: Infrastructure = tbtcJson as Infrastructure;
import lombardJson from "../content/infrastructures/lombard.json" assert { type:
    "json" };
const lombard: Infrastructure = lombardJson as Infrastructure;
import wbtcJson from "../content/infrastructures/wbtc.json" assert { type:
    "json" };
const wbtc: Infrastructure = wbtcJson as Infrastructure;
import cbbtcJson from "../content/infrastructures/cbbtc.json" assert { type:
    "json" };
const cbbtc: Infrastructure = cbbtcJson as Infrastructure;

export const allInfrastructures: Infrastructure[] = [
    cashu,
    fedimint,
    lombard,
    tbtc,
    wbtc,
    cbbtc,
    dlclink,
    bool,
    nubit,
    sovereign,
    lorenzo,
    espresso,
    celestia,
    bvm,
    avail,
    astria,
    babylon,
];

export const allInfrastructureSlugs: string[] = allInfrastructures.map(
    (infrastructure) => infrastructure.slug,
);
