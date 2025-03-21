import { Inject } from '@nestjs/common';

import { APP_TOOLKIT, IAppToolkit } from '~app-toolkit/app-toolkit.interface';
import { PositionTemplate } from '~app-toolkit/decorators/position-template.decorator';
import {
  GetMasterChefDataPropsParams,
  GetMasterChefTokenBalancesParams,
  MasterChefTemplateContractPositionFetcher,
} from '~position/template/master-chef.template.contract-position-fetcher';

import { PieDaoContractFactory, PieDaoStaking } from '../contracts';

@PositionTemplate()
export class EthereumPieDaoFarmMasterChefContractPositionFetcher extends MasterChefTemplateContractPositionFetcher<PieDaoStaking> {
  groupLabel = 'Farms';
  chefAddress = '0x6de77a304609472a4811a0bfd47d8682aebc29df';

  constructor(
    @Inject(APP_TOOLKIT) protected readonly appToolkit: IAppToolkit,
    @Inject(PieDaoContractFactory) protected readonly contractFactory: PieDaoContractFactory,
  ) {
    super(appToolkit);
  }

  getContract(address: string) {
    return this.contractFactory.pieDaoStaking({ address, network: this.network });
  }

  async getPoolLength(contract: PieDaoStaking) {
    return contract.poolCount();
  }

  async getStakedTokenAddress(contract: PieDaoStaking, poolIndex: number) {
    return contract.getPoolToken(poolIndex);
  }

  async getRewardTokenAddress(contract: PieDaoStaking) {
    return contract.reward();
  }

  async getTotalAllocPoints() {
    return 1;
  }

  async getPoolAllocPoints() {
    return 1;
  }

  async getTotalRewardRate({ contract, definition }: GetMasterChefDataPropsParams<PieDaoStaking>) {
    return contract.getPoolRewardRate(definition.poolIndex);
  }

  async getStakedTokenBalance({
    address,
    contract,
    contractPosition,
  }: GetMasterChefTokenBalancesParams<PieDaoStaking>) {
    return contract.getStakeTotalDeposited(address, contractPosition.dataProps.poolIndex);
  }

  async getRewardTokenBalance({
    address,
    contract,
    contractPosition,
  }: GetMasterChefTokenBalancesParams<PieDaoStaking>) {
    return contract.getStakeTotalUnclaimed(address, contractPosition.dataProps.poolIndex);
  }
}
