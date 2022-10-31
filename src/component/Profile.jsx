import { Box, Button, Text } from "@chakra-ui/react"
// import "./Profile.css"
import React from "react"

// const Profile = ({ fullName, position, age }) => {
//     return (
//         <Box>
//             <Text>Full Name: {fullName}</Text>
//             <Text>Position: {position}</Text>
//             <Text>
//                 Age: {age}
//             </Text>
//         </Box>
//     )
// }

// const Profile = ({ fullName, position, age }) => {
//   return (
//     <Box>
//       <Text >Full Name: {fullName}</Text>
//       <Text >Position: {position}</Text>
//       <Text
//         backgroundColor={'navy'}
//         color={'white'}
//       >
//         Age: {age}
//       </Text>
//     </Box >
//   )
// }

class Profile extends React.Component {
    //   state = {
    //     counter: 0,
    //   }

    //   1. componentWillMount(x)

    //   2. component render()

    //   3. componentDidMount()
    //   useEffect(() => {

    //   }, [])

    // 4. componentWillUpdate(x)
    //   - perubahan akan terjadi

    // 5. componentDidUpdate()
    // useEffect(() => {

    // }, [counter])

    // 6. componentWillUnmount()
    // useEffect(() => {
    //   return () => {
    //   }
    // }, [])


    render() {
        return (
            <Box>
                <Text>Full Name: {this.props.fullName}</Text>
                <Text>Position: {this.props.position}</Text>
                <Text>Age: {this.props.age}</Text>
                {/* <Text>{this.state.counter}</Text> */}
                {/* <Button onClick={() => this.setState({ counter: this.state.counter + 1 })}> */}
                {/* Change State */}
                {/* </Button> */}
            </Box >
        )
    }
}

export default Profile

