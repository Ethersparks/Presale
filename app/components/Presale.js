import React from 'react';

class RegistrationUtils {
    static isEmailValid(email) {
        return true;
    }   
}

class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: {
            email: "",
            address: ""
        },
        blurred: {
            email: false,
            address: false
        }       
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
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
        this.setState(state => ({
            ...state,
            blurred: {
                ...state.blurred,
                [fieldName]: true
            }
        }))
    }

    handleFormSubmit(event) {
        //connect to DB and post after validation
    }
    
    validate() {
        const errors = {};
        const {input, blurred} = this.state;
        
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

        return (
            <form onSubmit={this.handleFormSubmit()}>
                <div>
                    <input
                        name="email"
                        placeholder="email"
                        value={input.email}
                        onBlur={() => this.handleBlur('email')}
                        onChange={e => this.handleInputChange({email: e.target.value})}
                    />
                    {blurred.email && !!errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <input
                        name="address"
                        placeholder="address"
                        value={input.address}
                        onBlur={() => this.handleBlur('address')}
                        onChange={e => this.handleInputChange({address: e.target.value})}
                    />
                    {blurred.address && !!errors.address && <span>{errors.address}</span>}
                </div>
                    <button type="submit" disabled={!isValid}>
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
            opacity:"0.5",
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