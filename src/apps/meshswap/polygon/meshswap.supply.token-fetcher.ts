import { Inject } from '@nestjs/common';
import _ from 'lodash';

import { APP_TOOLKIT, IAppToolkit } from '~app-toolkit/app-toolkit.interface';
import { Register } from '~app-toolkit/decorators';
import { buildDollarDisplayItem } from '~app-toolkit/helpers/presentation/display-item.present';
import { DefaultDataProps, StatsItem } from '~position/display.interface';
import {
  AppTokenTemplatePositionFetcher,
  DisplayPropsStageParams,
  UnderlyingTokensStageParams,
} from '~position/template/app-token.template.position-fetcher';
import { Network } from '~types/network.interface';

import { MeshswapContractFactory, MeshswapSinglePool } from '../contracts';
import { MESHSWAP_DEFINITION } from '../meshswap.definition';

const appId = MESHSWAP_DEFINITION.id;
const groupId = MESHSWAP_DEFINITION.groups.supply.id;
const network = Network.POLYGON_MAINNET;

@Register.TokenPositionFetcher({ appId, groupId, network })
export class PolygonMeshswapSupplyTokenFetcher extends AppTokenTemplatePositionFetcher<MeshswapSinglePool> {
  appId = appId;
  groupId = groupId;
  network = network;

  constructor(
    @Inject(APP_TOOLKIT) protected readonly appToolkit: IAppToolkit,
    @Inject(MeshswapContractFactory) private readonly contractFactory: MeshswapContractFactory,
  ) {
    super(appToolkit);
  }

  getContract(address: string): MeshswapSinglePool {
    return this.contractFactory.meshswapSinglePool({ network, address });
  }

  async getAddresses(): Promise<string[]> {
    const multicall = this.appToolkit.getMulticall(network);
    const singlePoolFactoryContract = this.contractFactory.meshswapSinglePoolFactory({
      network,
      address: '0x504722a6eabb3d1573bada9abd585ae177d52e7a',
    });

    const poolCountRaw = await multicall.wrap(singlePoolFactoryContract).getPoolCount();
    const poolCount = Number(poolCountRaw);

    const supplyAddresses = await Promise.all(
      _.range(0, poolCount).map(async index => {
        const addressRaw = await multicall.wrap(singlePoolFactoryContract).getPoolAddressByIndex(index);
        return addressRaw.toLowerCase();
      }),
    );
    return supplyAddresses;
  }

  async getUnderlyingTokenAddresses({ contract }: UnderlyingTokensStageParams<MeshswapSinglePool>): Promise<string> {
    return await contract.token();
  }

  async getStatsItems({
    appToken,
    contract,
  }: DisplayPropsStageParams<MeshswapSinglePool, DefaultDataProps>): Promise<StatsItem[]> {
    const cashRaw = await contract.getCash();
    const borrowAmountRaw = await contract.totalBorrows();
    const decimals = appToken.decimals;

    const cash = Number(cashRaw) / 10 ** decimals;
    const borrowAmount = Number(borrowAmountRaw) / 10 ** decimals;
    const liquidity = cash + borrowAmount;

    return [{ label: 'Liquidity', value: buildDollarDisplayItem(liquidity) }];
  }
}
