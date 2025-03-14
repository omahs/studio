import { Inject } from '@nestjs/common';

import { APP_TOOLKIT, IAppToolkit } from '~app-toolkit/app-toolkit.interface';
import { AppTokenTemplatePositionFetcher } from '~position/template/app-token.template.position-fetcher';
import {
  GetDataPropsParams,
  GetPricePerShareParams,
  GetPriceParams,
  GetUnderlyingTokensParams,
  GetAddressesParams,
  DefaultAppTokenDataProps,
} from '~position/template/app-token.template.types';

import { BadgerContractFactory, BadgerSett } from '../contracts';

import { BadgerVaultTokenDefinitionsResolver } from './badger.vault.token-definition-resolver';

export type BadgerVaultTokenDefinition = {
  address: string;
  underlyingTokenAddress: string;
};

export abstract class BadgerVaultTokenFetcher extends AppTokenTemplatePositionFetcher<
  BadgerSett,
  DefaultAppTokenDataProps,
  BadgerVaultTokenDefinition
> {
  constructor(
    @Inject(APP_TOOLKIT) protected readonly appToolkit: IAppToolkit,
    @Inject(BadgerVaultTokenDefinitionsResolver)
    private readonly tokenDefinitionsResolver: BadgerVaultTokenDefinitionsResolver,
    @Inject(BadgerContractFactory) protected readonly contractFactory: BadgerContractFactory,
  ) {
    super(appToolkit);
  }

  getContract(address: string): BadgerSett {
    return this.contractFactory.badgerSett({ network: this.network, address });
  }

  async getDefinitions(): Promise<BadgerVaultTokenDefinition[]> {
    return this.tokenDefinitionsResolver.getVaultDefinitions(this.network);
  }

  async getAddresses({ definitions }: GetAddressesParams<BadgerVaultTokenDefinition>): Promise<string[]> {
    return definitions.map(v => v.address);
  }

  async getUnderlyingTokenDefinitions({
    definition,
  }: GetUnderlyingTokensParams<BadgerSett, BadgerVaultTokenDefinition>) {
    return [{ address: definition.underlyingTokenAddress, network: this.network }];
  }

  async getPricePerShare({ contract, appToken, multicall }: GetPricePerShareParams<BadgerSett>) {
    const yVaultContract = this.contractFactory.badgerYearnVault({ address: contract.address, network: this.network });
    const decimals = appToken.decimals;

    const ratioRaw =
      contract.address === '0x4b92d19c11435614cd49af1b589001b7c08cd4d5'
        ? await multicall.wrap(yVaultContract).pricePerShare()
        : await multicall.wrap(contract).getPricePerFullShare();

    return Number(ratioRaw) / 10 ** decimals;
  }

  async getPrice({ appToken, contract, multicall }: GetPriceParams<BadgerSett>) {
    const reserve = Number(appToken.pricePerShare) * appToken.supply;
    const liquidity = reserve * appToken.tokens[0].price;

    let price = liquidity / appToken.supply;
    if (contract.address === '0x7e7e112a68d8d2e221e11047a72ffc1065c38e1a') {
      // bDIGG is a rebalancing token, calculate its price based on the underlying balance of DIGG
      const settContract = this.contractFactory.badgerSett({ address: contract.address, network: appToken.network });
      const contractDiggBalanceRaw = await multicall.wrap(settContract).balance();
      const contractDiggBalance = Number(contractDiggBalanceRaw) / 10 ** appToken.tokens[0].decimals;
      price = (contractDiggBalance / appToken.supply) * appToken.tokens[0].price;
    }

    return price;
  }

  async getReserves({ appToken }: GetDataPropsParams<BadgerSett>) {
    return [Number(appToken.pricePerShare[0]) * appToken.supply];
  }

  async getLiquidity({ appToken }: GetDataPropsParams<BadgerSett>) {
    return appToken.supply * appToken.price;
  }

  async getApy(_params: GetDataPropsParams<BadgerSett>) {
    return 0;
  }
}
