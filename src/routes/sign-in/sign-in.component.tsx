import { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button,{BUTTON_TYPE_CLASSES} from "../../components/button/Button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import { useDispatch } from "react-redux";
import { Auth, AuthError, AuthErrorCodes } from "firebase/auth";
import './sign-in.styles.scss';
const defaultFormFields = {
    email: '',
    password: ''
};

const SingIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const dispatch = useDispatch();
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }


    const logGoogleUser = async () => {
       dispatch(googleSignInStart());
       
    }

    const loginWithEmailAndPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
        //    const {user} = await signInWithGoogleEmailAndPassword(email, password);
            setFormFields(defaultFormFields);
            
            //setCurrentUser()
        } catch (error) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('incorrect password for email');
                    break;
                case AuthErrorCodes.USER_DELETED:
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    return (
        <div className="sign-in-container">
            <h2> Already have an account? </h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ loginWithEmailAndPassword}>
                <FormInput
                    label="email"
                    type="email"
                    required
                    onChange={changeHandler}
                    name='email'
                    value={email}
                />
                <FormInput
                    label="password"
                    type="password"
                    required
                    onChange={changeHandler}
                    name='password'
                    value={password}
                />
                <div className="buttons-container">
                    <Button type='submit' >Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SingIn;