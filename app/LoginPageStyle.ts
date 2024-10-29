import { StyleSheet } from 'react-native';

const LoginPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5A5260',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A5260',
    marginBottom: 5,
    alignSelf: 'center',
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#5A5260',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: '#5A5260',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#5A5260',
    textDecorationLine: 'underline',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#5A5260',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#5A5260',
  },
  signUpText: {
    fontWeight: 'bold',
    color: '#5A5260',
  },
});

export default LoginPageStyles;
