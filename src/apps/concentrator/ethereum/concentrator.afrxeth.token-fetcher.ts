import { Inject } from '@nestjs/common';

import { IAppToolkit, APP_TOOLKIT } from '~app-toolkit/app-toolkit.interface';
import { PositionTemplate } from '~app-toolkit/decorators/position-template.decorator';
import { AppTokenTemplatePositionFetcher } from '~position/template/app-token.template.position-fetcher';
import { GetDataPropsParams, GetPricePerShareParams } from '~position/template/app-token.template.types';

import { AladdinFrxEth, ConcentratorContractFactory } from '../contracts';

@PositionTemplate()
export class EthereumConcentratorAfrxethTokenFetcher extends AppTokenTemplatePositionFetcher<AladdinFrxEth> {
  groupLabel = 'afrxETH';

  constructor(
    @Inject(APP_TOOLKIT) protected readonly appToolkit: IAppToolkit,
    @Inject(ConcentratorContractFactory) protected readonly contractFactory: ConcentratorContractFactory,
  ) {
    super(appToolkit);
  }

  getContract(address: string): AladdinFrxEth {
    return this.contractFactory.aladdinFrxEth({ address, network: this.network });
  }

  async getAddresses() {
    return ['0xb15ad6113264094fd9bf2238729410a07ebe5aba'];
  }

  async getUnderlyingTokenDefinitions() {
    return [{ address: '0xf43211935c781d5ca1a41d2041f397b8a7366c7a', network: this.network }];
  }

  async getPricePerShare({ appToken, contract }: GetPricePerShareParams<AladdinFrxEth>) {
    const reserveRaw = await contract.totalAssets();
    const reserve = Number(reserveRaw) / 10 ** appToken.tokens[0].decimals;
    return reserve / appToken.supply;
  }

  async getLiquidity({ appToken }: GetDataPropsParams<AladdinFrxEth>) {
    return appToken.supply * appToken.price;
  }

  async getReserves({ appToken }: GetDataPropsParams<AladdinFrxEth>) {
    return [appToken.pricePerShare[0] * appToken.supply];
  }

  async getApy(_params: GetDataPropsParams<AladdinFrxEth>) {
    return 0;
  }
}
