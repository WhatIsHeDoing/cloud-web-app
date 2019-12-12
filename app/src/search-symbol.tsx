import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { FC } from "react";
import useForm from "react-hook-form";
import { toast } from "react-toastify";

import { SearchSymbolResult } from "./generated/graphql";

export const SearchSymbol: FC = () => {
    const { register, handleSubmit, errors } = useForm<Form>();
    const [searchSymbol] = useMutation<{ "searchSymbol": SearchSymbolResult }>(searchSymbolMutation);

    const onSubmit = async ({ symbol }: Form) => {
        const { data, errors } = await searchSymbol({ variables: { symbol } });

        if (!data || (errors && errors.length)) {
            toast.error("We had trouble with that request, sorry 😢");
            return;
        }

        const res = data.searchSymbol;

        if ("symbols" in res) {
            toast.warn("We found: " + res.symbols.map(s => s.symbol).join(", "));
            return;
        }

        toast.success("Success! We found: " + res.name);
    };

    return (
        // tslint:disable-next-line: no-console
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="symbol" ref={register({ required: true })} />
            {errors.symbol && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
};

interface Form {
    symbol: string;
}

const searchSymbolMutation = gql`
    mutation SearchSymbol($symbol: String!) {
        searchSymbol(symbol:$symbol) {
            ... on Symbol {
                currency
                name
                region
            }
            ... on PossibleSymbols {
                symbols {
                    name
                    symbol
                    matchScore
                    region
                }
            }
        }
    }
`;
