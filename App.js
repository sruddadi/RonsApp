import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import RegisterScreen from "./screens/register";
import ForgotPasswordScreen from "./screens/forgotPassword";
import MenuScreen from "./screens/Menu";
import QuizScreen from "./screens/Quiz_page";
import SettingScreen from "./screens/setting";
import Titles from "./screens/consonants";
import VowTitles from "./screens/Vowels";
import Details from "./screens/Details";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        
       
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Phone" component={Titles} />
        <Stack.Screen name="Vow" component={VowTitles} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
