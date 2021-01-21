import * as React from 'react';
import { IFormCrudProps } from './IFormCrudProps';
import { IFormCrudState } from './IFormCrudState';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";
import {
    Link
} from "react-router-dom";
import {
    Formik,
    ErrorMessage,
    Form,
    Field,
    FormikHelpers,
    FormikProps
} from 'formik';
import * as Yup from "yup";
import "@pnp/sp/sites";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { WrappedTextField } from './wrappedFields/WrappedTextField';
import { WrappedSelect } from './wrappedFields/WrappedSelect';
import { IWrappedSelectItemMenu } from './wrappedFields/IWrappedSelectItemMenu' ;

interface IFormValues {
    Id: string;
    Title: string;
    Nome: string;
    DataCadastro: string;
    TipoCliente: string;
}

export class FormCrud extends React.Component<IFormCrudProps, IFormCrudState> {

    private tiposClientesItens: IWrappedSelectItemMenu[];
    public constructor(props: IFormCrudProps, state: IFormCrudState) {
        super(props);
        //TODO 
        //Verificar outra forma de receber o state de fora do componente
        this.state = {
            id: this.props.id
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.tiposClientesItens = [];
    }

    public async componentDidMount() {
        this.tiposClientesItens = [
            {value:'1',description:'option 1' },
            {value:'22',description:'option 2' }
        ];
    }

    private async handleSubmitForm(values: IFormValues, formikHelpers: FormikHelpers<IFormValues>) {
        console.log({ values, formikHelpers });
        alert(JSON.stringify(values, null, 2));
        formikHelpers.setSubmitting(false);

        if (this.props.newRegistration) {
            const iar: IItemAddResult = await sp.web.lists.getByTitle("Clientes").items.add(values);
            console.log(iar);
            //TODO
            //Setar como newRegistration false
            //Setar o ID
        } else {
            let list = sp.web.lists.getByTitle("Clientes");

            const i = await list.items.getById(Number(this.state.id)).update(values);
        }
    }

    public render(): React.ReactElement<IFormCrudProps> {

        const initialValues: any = {
            Title: '',
            Nome: '',
            DataCadastro: ''
        };

        const validationSchema = Yup.object().shape({
            Title: Yup.string().min(3, 'Preecha com mais informações!')
                .max(10, 'Grande')
                .required('Obrigatório!'),
            Nome: Yup.string().required('Obrigatório'),
            DataCadastro: Yup.date().required('Obrigatório'),
            TipoCliente: Yup.string().required('Obrigatório')
        });

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button component={Link} to="/">
                                Voltar
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={this.handleSubmitForm}>
                            {(formikProps: FormikProps<IFormValues>) => (
                                <Form noValidate autoComplete="off">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                id="Title"
                                                name="Title"
                                                label="Title"
                                                variant="outlined"
                                                component={WrappedTextField} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                id="Nome"
                                                name="Nome"
                                                label="Nome"
                                                variant="outlined"
                                                component={WrappedTextField} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                id="DataCadastro"
                                                name="DataCadastro"
                                                label="Data Cadastro"
                                                type="date"
                                                variant="outlined"
                                                component={WrappedTextField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                id="TipoCliente"
                                                name="TipoCliente"
                                                label="Tipo de Cliente"
                                                variant="outlined"
                                                component={WrappedSelect}
                                                menuitens={this.tiposClientesItens}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" color="primary" variant="contained">
                                                Salvar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
