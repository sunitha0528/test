
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
;

type LoaderProps = {
    isLoading: boolean
}

const Loader = ({
    isLoading
}: LoaderProps) => {


    return (<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
    );
}

export default Loader;