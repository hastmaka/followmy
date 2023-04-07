// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {GridFooterContainer, GridPagination} from "@mui/x-data-grid";
import EzText from "../../../components/EzText/EzText";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function PersonalFooter() {
    const {user} = useSelector(slice => slice.admin);
    const [footerData, setFooterData] = useState({
        deposit: 0,
        expenses: 0
    });

    useEffect(() => {
        const { deposit, expenses } = user?.tableData?.data.reduce(
            (acc, curr) => {
                const { deposit, expenses} = curr;
                acc.deposit += deposit;
                acc.expenses += expenses;
                return acc;
            },
            { deposit: 0, expenses: 0 }
        );
        setFooterData({ deposit, expenses });
    }, [user.tableData.data]);

    const { deposit, expenses } = footerData;
    return (
        <GridFooterContainer>
            <Stack direction='row' alignItems='center' p='0 0 0 20px' gap='20px'>
                <EzText text={`Earn: $${deposit.toFixed(2)}`} sx={{color: '#e9c46a'}}/>
                <EzText text={`Expenses: $${expenses.toFixed(2)}`} sx={{color: '#e63946'}}/>
                <EzText text={`Total: $${(deposit - expenses).toFixed(2)}`} sx={{color: '#2a9d8f'}}/>
                <EzText text={`Days: ${(user?.tableData?.data.length)}`} sx={{color: '#2a9d99'}}/>
            </Stack>
            <GridPagination />
        </GridFooterContainer>
    );
}
