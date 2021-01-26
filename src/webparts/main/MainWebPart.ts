import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MainWebPartStrings';
import Main from './components/Main';
import { IMainProps } from './components/IMainProps';
import { sp } from '@pnp/sp';  
import { proxyUrl, webRelativeUrl } from './../settings';  
import {
  Environment, EnvironmentType
} from '@microsoft/sp-core-library';




export interface IMainWebPartProps {
  description: string;
}

export default class MainWebPart extends BaseClientSideWebPart<IMainWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMainProps> = React.createElement(
      Main,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {

    return super.onInit().then(_=> {
     
      if (Environment.type === EnvironmentType.Local) {
        console.log(`DEV ENV`);
        console.log(`${proxyUrl}${webRelativeUrl}`);
        sp.setup({
          sp: {
            baseUrl: `${proxyUrl}${webRelativeUrl}`
          }
        });

      } else {
        console.log(`PROD ENV`);
        sp.setup({ spfxContext: this.context });
      }

    });


  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
