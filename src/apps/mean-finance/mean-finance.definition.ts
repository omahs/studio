import { Register } from '~app-toolkit/decorators';
import { appDefinition, AppDefinition } from '~app/app.definition';
import { AppAction, AppTag, GroupType } from '~app/app.interface';
import { Network } from '~types/network.interface';

export const MEAN_FINANCE_DEFINITION = appDefinition({
  id: 'mean-finance',
  name: 'Mean Finance',
  description:
    'Mean Finance enables users to Dollar Cost Average (DCA) any ERC20 into any ERC20 with their preferred period frequency.',
  url: 'https://mean.finance',
  tags: [AppTag.ASSET_MANAGEMENT, AppTag.CROSS_CHAIN, AppTag.PREDICTION_MARKET],
  keywords: [],

  groups: {
    dcaPosition: {
      id: 'dca-position',
      type: GroupType.POSITION,
      label: 'DCA Position',
    },
  },

  links: {
    discord: 'https://discord.com/invite/ThfzDdn4pn/',
    github: 'https://github.com/Mean-Finance',
    twitter: 'https://twitter.com/mean_fi',
  },

  supportedNetworks: {
    [Network.POLYGON_MAINNET]: [AppAction.VIEW],
    [Network.OPTIMISM_MAINNET]: [AppAction.VIEW],
    [Network.ARBITRUM_MAINNET]: [AppAction.VIEW],
    [Network.ETHEREUM_MAINNET]: [AppAction.VIEW],
  },

  primaryColor: '#3076F6',
});

@Register.AppDefinition(MEAN_FINANCE_DEFINITION.id)
export class MeanFinanceAppDefinition extends AppDefinition {
  constructor() {
    super(MEAN_FINANCE_DEFINITION);
  }
}
