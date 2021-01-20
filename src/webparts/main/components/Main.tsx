import * as React from 'react';
import styles from './Main.module.scss';
import { IMainProps } from './IMainProps';
import { IMainState } from './IMainState';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class Main extends React.Component<IMainProps, IMainState> {

  static siteurl: string = ""
  public constructor(props: IMainProps, state: IMainState) {
    super(props);
    this.state = {
      listitems: [
        {
          "ID": "",
          "Cargo": "",
          "Nome": "",
          "DataCadastro": ""
        }
      ]
    };
    Main.siteurl = this.props.websiteurl;
  }

  public async componentDidMount() {
    const w = await sp.web.select("Title")();
    console.log(`Web Title: ${w.Title}`);

    sp.web.lists.getByTitle("Clientes").items.get().then(list => {
      console.log(list);
    });

  }

  public render(): React.ReactElement<IMainProps> {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <span>a</span>
        </div>
      </div>
    );
  }
}
