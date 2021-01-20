import * as React from 'react';
import styles from './Main.module.scss';
import { IMainProps } from './IMainProps';
import { IMainState } from './IMainState';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

// TODO - viewFields

export default class Main extends React.Component<IMainProps, IMainState> {

  static viewFields: IViewField[] = [
    {   name: 'Id', displayName: 'Código'},
    {   name: 'Title', displayName: 'Cargo'},
    {   name: 'Nome', displayName: 'Nome'},
    {   name: 'DataCadastro', displayName: 'Data Cadastro'}
  ];

  public constructor(props: IMainProps, state: IMainState) {
    super(props);
    this.state = {
      listitems: []
    };
  }

  public async componentDidMount() {
    sp.web.lists.getByTitle("Clientes").items.get().then(list => {
      console.log(list);
      this.setState({listitems: list});
    });

  }

  private _getSelection(items: any[]) {
    console.log('Selected items:', items);
  }

  public render(): React.ReactElement<IMainProps> {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <ListView
            items={this.state.listitems}
            viewFields={Main.viewFields}
            compact={false}
            selectionMode={SelectionMode.multiple}
            selection={this._getSelection}
            showFilter={true}
            defaultFilter=""
            filterPlaceHolder="Search..."
            stickyHeader={false} />
        </div>
      </div>
    );
  }
}
