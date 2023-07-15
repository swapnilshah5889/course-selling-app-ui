import { Button } from "react-bootstrap";
import './button.styles.scss';

const MyButton = (props) => {

    const {btnText, variant, handleClick} = props;
    let btnDisabled = false;
    if("btnDisabled" in props) {
        btnDisabled = props.btnDisabled;
    }
    return (
        <Button 
            className="custom-button"
            variant={variant}
            disabled={btnDisabled}
            onClick={handleClick}
        >{btnText}</Button>
    )
}

export default MyButton;