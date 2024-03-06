import { RouterProvider, createBrowserRouter } from 'react-router-dom'

//Home
import Home from '@modules/Home';
import Login from '@modules/Home/Login';
import Register from '@modules/Home/Register';
import Landing from '@modules/Home/Landing';

// import Testing from '@modules/Home/Testing';
// import ResetPassword from '@modules/Home/ResetPassword';
// import Register from '@modules/Home/Register';
// import ForgotPassword from '@modules/Home/ForgotPassword';
// import TermsAndConditions from '@modules/Home/TermsAndConditions';

// //Dashboard
import Dashboard from '@modules/Dashboard';
import Overview from '@modules/Dashboard/Overview';
import Bbps from '@modules/Dashboard/Bbps';
import Products from '@modules/Dashboard/Products';
import Payouts from '@modules/Dashboard/Payouts';
import TermsandConditions from '@modules/Home/Info/TermsandConditions';
import PrivacyPolicy from '@modules/Home/Info/PrivacyPolicy';
import RefundCancellation from '@modules/Home/Info/RefundCancellation';
import ContactUs from '@modules/Home/Info/ContactUs';
import BBPSInformationPage from '@modules/Home/Info/BBPSInformationPage';
import BillerView from '@modules/Dashboard/Bills/BillerView';
import Utilities from '@modules/Dashboard/Utilities';
// import Network from '@modules/Dashboard/Network';


// //Categories
// import Categories from '@modules/Dashboard/Categories';
// import CreateCategories from '@modules/Dashboard/Categories/CreateCategories';
// import ViewCategories from '@modules/Dashboard/Categories/ViewCategories';
// //subCategories
// import CreateSubCategories from '@modules/Dashboard/Categories/CreateSubCategories';
// import ViewSubCategories from '@modules/Dashboard/Categories/ViewSubCategories';


// //Companies
// import Companies from '@modules/Dashboard/Companies';
// import CreateCompanies from '@modules/Dashboard/Companies/CreateCompanies';
// import ViewCompanies from '@modules/Dashboard/Companies/ViewCompanies';

// //Survey Creation
// import SurveyCreation from '@modules/Dashboard/SurveyCreation';
// import CreateSurvey from '@modules/Dashboard/SurveyCreation/CreateSurvey';
// import ViewSurvey from '@modules/Dashboard/SurveyCreation/ViewSurvey';
// import CreateSurveyUsing from '@modules/Dashboard/SurveyCreation/CreateSurveyUsing';
// import CreateSurveyPrompt from '@modules/Dashboard/SurveyCreation/CreateSurveyPrompt';
// import CreateSurveyUsingAI from '@modules/Dashboard/SurveyCreation/CreateSurveyUsingAI';
// import CreateSurveyPreview from '@modules/Dashboard/SurveyCreation/CreateSurveyPreview';


// //User Management
// import UserManagement from '@modules/Dashboard/UserManagement';
// import CreateUser from '@modules/Dashboard/UserManagement/CreateUser';
// import Users from '@modules/Dashboard/UserManagement/Users';
// import SuperAdmins from '@modules/Dashboard/UserManagement/SuperAdmins';


// //Viewer Board
// import ViewerBoard from '@modules/Viewer';
// import GSPanel from '@modules/Viewer/GSPanel';



const AppRoots = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                // {
                //     path: "test",
                //     element: <Testing />
                // },
                {
                    index: true,
                    path: "",
                    element: <Landing />
                },
                {
                    index: true,
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                },
                {
                    path: "Terms-conditions",
                    element: <TermsandConditions />
                },
                {
                    path: "Privacy-policy",
                    element: <PrivacyPolicy />
                },
                {
                    path: "Refund-cancellation",
                    element: <RefundCancellation />
                },
                {
                    path: "Contact-us",
                    element: <ContactUs />
                },
                {
                    path: "about",
                    element: <BBPSInformationPage />
                },
                
                // {
                //     path: "update-password/:auth",
                //     element: <ResetPassword />
                // },
                // {
                //     path: "forgot-password",
                //     element: <ForgotPassword />
                // },
                // {
                //     path: "terms-conditions",
                //     element: <TermsAndConditions />
                // },
            ],
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
                {
                    path: "overview",
                    element: <Overview />
                },
                {
                    path: "utilities",
                    element: <Utilities />
                },
                {
                    path: "bbps",
                    element: <Bbps />
                },
                {
                    path: "bbps/:id",
                    element: <Bbps />
                },
                {
                    path: "products",
                    element: <Products />
                },
                {
                    path: "payouts",
                    element: <Payouts />
                },
                {
                    path: "products/:id",
                    element: <Products />
                },
                {
                    path: "biller/:name",
                    element: <BillerView />
                }
              
            ],
        },
     
    ], { basename: "/", });



    return (
        <RouterProvider router={router} />
    )
}

export default AppRoots;