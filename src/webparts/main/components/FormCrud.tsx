import * as React from 'react';
import styles from './Main.module.scss';
import { IFormCrudProps } from './IFormCrudProps';
import { IFormCrudState } from './IFormCrudState';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import {
    Link
} from "react-router-dom";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';


interface IFormValues {
    Id: string;
    Title: string;
    Nome: string;
    DataCadastro: string;
}

export class FormCrud extends React.Component<IFormCrudProps, IFormCrudState> {

    public async componentDidMount() {

    }

    public render(): React.ReactElement<IFormCrudProps> {

        const initialValues: any = {
            Id: '',
            Title: '',
            Nome: '',
            DataCadastro: ''
        };

        // const validationSchema = Yup.object().shape({
        //     Title: Yup.string().min(3, 'Preecha com mais informações!')
        //         .max(10, 'Grande')
        //         .required('Obrigatório!'),
        //     Nome: Yup.string().required('Obrigatório')
        // });

        const validationSchema = {};

        return (
            <div>
                <div>
                    <Link to="/">
                        <button type="button"> x </button>
                    </Link>
                </div>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            console.log({ values, actions });
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }}>
                        {({ errors, touched, isValidating }) => (
                            <Form>
                                <label htmlFor="Title">Title</label>
                                <Field id="Title" name="Title" placeholder="Title" />
                                {errors.Title && touched.Title ? (
                                    <div>{errors.Title}</div>
                                ) : null}
                                <label htmlFor="Nome">Nome</label>
                                <Field id="Nome" name="Nome" placeholder="Nome" />
                                {errors.Nome && touched.Nome ? (
                                    <div>{errors.Nome}</div>
                                ) : null}
                                <label htmlFor="DataCadastro">Data Cadastro</label>
                                <Field id="DataCadastro" name="DataCadastro" placeholder="Data Cadastro" />
                                {errors.DataCadastro && touched.DataCadastro ? (
                                    <div>{errors.DataCadastro}</div>
                                ) : null}
                                <button type="submit">Salvar</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div>

                </div>
            </div>
        );
    }
}
