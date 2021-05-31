import React from 'react';
import RegistrationsStore from './RegistrationsStore'

class RegistrationUtils {
    static isEmailValid(email) {
        return true;
    }   
}

class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.defaultInputState = {
          email : "",
          address: "",
      };
      
      this.state = {
        input: this.defaultInputState,
        blurred: {
            email: false,
            address: false
        }       
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      RegistrationsStore.subscribe(this.handleServerSubmit);
    }
  
    handleInputChange(name,value) {
      //set state
      if(name == "email") {
        this.setState({
          input: {
              email: value,
              address: this.state.input.address
          }
        });
      } else {
        this.setState({
            input: {
                email: this.state.input.email,
                address: value
            }
          });
      }
    }

    handleBlur(fieldName) {
        
        const blur = this.state.blurred;
        blur[fieldName] = true;

        // update state
        this.setState({
            blurred: blur,
        });
    }

    handleServerSubmit(action) {
        console.log("Success from server");
        console.log(action);
    }

    handleFormSubmit(event) {
        //connect to DB and post after validation
        console.log("Hurray! : "+this.state.input.email)
        console.log("Hurray! : "+this.state.input.address)
        RegistrationsStore.add(this.state.input.email, this.state.input.address);
        this.state.input = this.defaultInputState;
    }
    
    validate() {
        const errors = {};
        const {input} = this.state;
        
        if (!input.email) {
            errors.email = 'Email is required';
        } else if (!RegistrationUtils.isEmailValid(input.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!input.address) {
            errors.address = 'Eth address is required';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };
}
  
    render() {
        const {input, blurred} = this.state;
        const {errors, isValid} = this.validate();
        
        //different behaviors, on submit instead of click
        {/* <form onSubmit={() => {this.handleFormSubmit()}} disabled={!isValid}> > */}
        {/* <button type="submit*/}
        return (
            <form >
                <div>
                    <input
                        name="email"
                        placeholder="email"
                        value={input.email}
                        onBlur={() => this.handleBlur('email')}
                        onChange={e => this.handleInputChange("email",e.target.value)}
                    />
                    {blurred.email && !!errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <input
                        name="address"
                        placeholder="address"
                        value={input.address}
                        onBlur={() => this.handleBlur('address')}
                        onChange={e => this.handleInputChange("address", e.target.value)}
                    />
                    {blurred.address && !!errors.address && <span>{errors.address}</span>}
                </div>
                    <button type="button"onClick={() => {this.handleFormSubmit()}} disabled={!isValid}>
                        Submit
                    </button>
            </form>
        );
    }
  }
  
  
  
class PresaleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.style = {
            margin:"auto",
            position:"absolute",
            left:"0",
            right:"0",
            top : "0",
            bottom : "0",
            width:"70%",
            height:"400px",
            backgroundImage: "url(http://ethersparks.io/wp-content/uploads/2018/05/CitySkyline.jpg)",
           
        }
        this.formContainerStyle = {
            width: "300px",
            height: "150px",
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: "-150px",
            marginTop: "-75px",
            opacity:"1.0",
            backgroundColor: '#FFFFFF'
        }
        this.formDivStyle = {
            width: "100px",
            height: "100px",
            position: "relative",
            left: "50%",
            top: "50%",
            marginLeft: "-50px",
            marginTop: "-50px",
            alignItems:"center",
        }
    }

    render() {
        return(
                <div style={this.style}>
                    <div style={this.formContainerStyle}>
                            <RegistrationForm style={this.formDivStyle}/>
                    </div>
                </div>
        )
    }
}

export default PresaleForm;