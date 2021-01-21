import * as React from 'react';
import styles from './Main.module.scss';
import { IMainProps } from './IMainProps';
import { IMainState } from './IMainState';
import { FormCrud } from './FormCrud';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import {
  HashRouter,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";
import { IFormCrudProps } from './IFormCrudProps';

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

export default class Main extends React.Component<IMainProps, IMainState> {

  private static viewFields: IViewField[] = [
    { name: 'Id', displayName: 'Código', maxWidth: 100 },
    { name: 'Title', displayName: 'Cargo', maxWidth: 100 },
    { name: 'Nome', displayName: 'Nome', maxWidth: 100 },
    { name: 'DataCadastro', displayName: 'Data Cadastro', maxWidth: 100 }
  ];

  public constructor(props: IMainProps, state: IMainState) {
    super(props);
    this.state = {
      listitems: [],
      id: 0
    };
    this.handleListSelection = this.handleListSelection.bind(this);
  }

  public async componentDidMount() {
    //  sp.web.lists.getByTitle("Clientes").items.get().then(list => {
    //    console.log(list);
    //    this.setState({ listitems: list });
    //  });    
    this.setState({ listitems: [
      {Id:1,Title:'Estoquista',Nome:'Thiago',DataCadastro: Date.now().toString()},
      {Id:2,Title:'Dev',Nome:'Enzo',DataCadastro: Date.now().toString()}
    ] });
  }

  private handleListSelection(items: any[]) {
    this.setState({ id:  items[0]['Id']});
  }

  public render(): React.ReactElement<IMainProps> {
    return (
      <HashRouter>
        <div className={styles.main}>
          <div className={styles.container}>
            <Switch>

              <Route path="/form/:id" render={({ match }: MatchProps) => (
                <FormCrud id={match.params.id} newRegistration={match.params.id==='0'} />)}
              />

              <Route path="/">
                <Link to={'/form/'+ this.state.id }>
                  <button type="button" disabled={this.state.id === 0} >
                    Editar 
                  </button>
                </Link>
                <Link to={'/form/0'}>
                  <button type="button">
                    Novo 
                  </button>
                </Link>
                <ListView
                  items={this.state.listitems}
                  viewFields={Main.viewFields}
                  compact={false}
                  selectionMode={SelectionMode.single}
                  selection={this.handleListSelection}
                  showFilter={true}
                  defaultFilter=""
                  filterPlaceHolder="Search..."
                  stickyHeader={false} />
              </Route>

            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}
