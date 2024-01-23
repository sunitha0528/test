import { useGetBillerDetailsQuery } from '@store/apis/bbps-api-slice';
import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import { Grid, Typography, Paper } from '@mui/material';
import useDataConverter from '@hooks/useDataConverter';
import { useNavigate } from 'react-router-dom';



const Overview = () => {
  const navigate = useNavigate();
  const { data,isLoading } = useGetBillerDetailsQuery();
  const [billerList, setBillerList] = useState([]);
  const { encrypt } = useDataConverter();

  useEffect(() => {
    if (data && data.status === 200) {
      setBillerList(data.data);
    }

  }, [data])
  return (<>
  <Loader isLoading={isLoading} />
  <Paper sx={{ p: 2, backgroundColor: '#fffef5' }}>
            <Grid my={1} justifyContent={'center'} container>
                {billerList.map((item: any) => (<Grid key={item}
                    onClick={() => {
                        navigate('/dashboard/biller/' + encrypt(item))
                    }}
                    sx={{
                        backgroundColor: '#fff',
                        margin: 1,
                        borderRadius: 2,
                        padding: 1,
                        cursor: 'pointer',
                        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);'
                    }}
                    item xs={2}>
                    <Typography textAlign={'center'} variant="body1">
                        <img width={30} src={'https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_Elec._CB616315948_.png'} alt={item.key} />
                    </Typography>
                    <Typography textAlign={'center'} variant="body1">
                        {item}
                    </Typography>
                </Grid>))}

            </Grid>

        </Paper>
  </>
 
  )
}

export default Overview