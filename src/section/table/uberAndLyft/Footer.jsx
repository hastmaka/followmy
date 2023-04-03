// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import {GridFooterContainer, GridPagination} from "@mui/x-data-grid";
import EzText from "../../../components/EzText/EzText";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function Footer({rows}) {
    const {earn, expenses, hours} = rows?.reduce((acc, curr) => {
        const {uber, lyft, other, gas, expenses, miles, hours} = curr;
        acc.earn += uber + lyft + other
        acc.expenses += gas + expenses + miles * 0.08
        acc.hours += hours
        return acc
    },{earn: 0, expenses: 0, hours: 0})
    return (
        <GridFooterContainer>
            <Stack direction='row' alignItems='center' p='0 0 0 20px' gap='20px'>
                <EzText text={`Earn: $${earn.toFixed(2)}`} sx={{color: '#e9c46a'}}/>
                <EzText text={`Expenses: $${expenses.toFixed(2)}`} sx={{color: '#e63946'}}/>
                <EzText text={`Total: $${(earn - expenses).toFixed(2)}`} sx={{color: '#2a9d8f'}}/>
                <EzText text={`Hours: ${(hours).toFixed(2)}`} sx={{color: '#2a6d9d'}}/>
                <EzText text={`Days: ${(rows?.length)}`} sx={{color: '#2a9d99'}}/>
            </Stack>
            <GridPagination />
        </GridFooterContainer>
    );
}
