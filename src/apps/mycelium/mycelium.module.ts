import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { ArbitrumMyceliumEsMycTokenFetcher } from './arbitrum/mycelium.es-myc.token-fetcher';
import { ArbitrumMyceliumMlpTokenFetcher } from './arbitrum/mycelium.mlp.token-fetcher';
import { ArbitrumMycellilumPerpContractPositionFetcher } from './arbitrum/mycelium.perp.contract-position-fetcher';
import { MyceliumContractFactory } from './contracts';
import { MyceliumAppDefinition } from './mycelium.definition';

@Module({
  providers: [
    MyceliumAppDefinition,
    MyceliumContractFactory,
    // Arbitrum
    ArbitrumMyceliumEsMycTokenFetcher,
    ArbitrumMyceliumMlpTokenFetcher,
    ArbitrumMycellilumPerpContractPositionFetcher,
  ],
})
export class MyceliumAppModule extends AbstractApp() {}
