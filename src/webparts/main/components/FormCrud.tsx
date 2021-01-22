import * as React from 'react';
import { IFormCrudProps } from './IFormCrudProps';
import { IFormCrudState } from './IFormCrudState';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItem, IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";
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
import { IWrappedSelectItemMenu } from './wrappedFields/IWrappedSelectItemMenu';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

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
            Id: this.props.id,
            Title: '',
            Nome: '',
            DataCadastro: '',
            TipoCliente: '',
            openSnack: false
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
        this.tiposClientesItens = [];
    }

    public async componentDidMount() {
        console.log(this.state.Id);
        this.tiposClientesItens = [
            { value: '1', description: 'option 1' },
            { value: '22', description: 'option 2' }
        ];

        if (this.state.Id !== '0') {
            await sp.web.lists.getByTitle("Clientes").items.getById(Number(this.state.Id)).get()
                .then((result) => {
                    console.log(result);
                    this.setState(result);
                });
        }

    }

    private handleSnackClose() {
        this.setState({ openSnack: false });
    }

    private async handleSubmitForm(values: IFormValues, formikHelpers: FormikHelpers<IFormValues>) {
        //console.log({ values, formikHelpers });
        ///alert(JSON.stringify(values, null, 2));
        formikHelpers.setSubmitting(false);

        const ClienteList = sp.web.lists.getByTitle("Clientes").items;

        if (this.state.Id === '0') {
            await ClienteList.add(values)
                .then((result: IItemAddResult) => {
                    console.log(result.data);
                    //Setar o ID
                    this.setState({
                        Id: result.data.Id
                    });
                });
        } else {

            ClienteList.getById(Number(this.state.Id)).update(values)
                .then((result: IItemUpdateResult) => {
                    console.log(result);
                });
        }

         ////trocar para notistack
        ///Msg - Sucesso ou Falha
        this.setState({ openSnack: true });

    }

    public render(): React.ReactElement<IFormCrudProps> {

        const initialValues: IFormValues = this.state;

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

               
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.openSnack}
                    onClose={this.handleSnackClose}
                    autoHideDuration={5000}
                    TransitionComponent={Slide}
                    message="Salvo com sucesso!"
                    key={'top' + 'right'}
                />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button component={Link} to={'/'}>
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
                                                component={WrappedTextField} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                id="Nome"
                                                name="Nome"
                                                label="Nome"
                                                component={WrappedTextField} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                fullWidth
                                                id="DataCadastro"
                                                name="DataCadastro"
                                                label="Data Cadastro"
                                                type="date"
                                                component={WrappedTextField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl error={Boolean(formikProps.errors.TipoCliente && formikProps.touched.TipoCliente)} fullWidth>
                                                <TextField
                                                    id="TipoCliente"
                                                    select
                                                    label="TipoCliente"
                                                    value={formikProps.values.TipoCliente}
                                                    onChange={formikProps.handleChange("TipoCliente")}
                                                    margin="normal"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="1">
                                                        <em>VIP</em>
                                                    </MenuItem>
                                                    <MenuItem value="2">
                                                        <em>Critico</em>
                                                    </MenuItem>
                                                </TextField>
                                                <FormHelperText>{((formikProps.touched.TipoCliente && formikProps.errors.TipoCliente) ? formikProps.errors.TipoCliente : undefined)}</FormHelperText>
                                            </FormControl>
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
            </div >
        );
    }
}
