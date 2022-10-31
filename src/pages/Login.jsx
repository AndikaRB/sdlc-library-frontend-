import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Image, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react"
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { axiosInstance } from "../api";
import * as Yup from 'yup'
import { login } from "../redux/features/authSlice";

const LoginPage = () => {
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            NIM: "",
            password: ""
        },
        onSubmit: async ({ NIM, password }) => {
            try {
                const response = await axiosInstance.post('/auth/login', {
                    NIM,
                    password
                })
                toast({
                    title: "login successful",
                    status: "success",
                    description: response.data.message,
                })

                localStorage.setItem("auth_token", response.data.token)
                dispatch(
                    login({
                        id: response.data.data.id,
                        username: response.data.data.username,
                        email: response.data.data.email,
                        NIM: response.data.data.NIM
                    })
                )
                formik.setFieldValue("NIM", "")
                formik.setFieldValue("password", "")
            } catch (err) {
                console.log(err)
                toast({
                    title: "login failed",
                    status: "error",
                    description: err.response.data.message,
                })
            }
        },
        validationSchema: Yup.object({
            NIM: Yup.number().required(),
            password: Yup.string().required(),
        }),
        validateOnChange: false,
    })

    const formChangeHandler = ({ target }) => {
        const { name, value } = target;
        formik.setFieldValue(name, value)
    }

    return (
        <Box bg={'lightgray'} p={'100px 40px 40px 40px'}>
            <Flex
                direction={{
                    base: "column",
                    md: "column",
                    lg: "row"
                }}
            >
                <Box flex={'1'} bg={'white'}>
                    <Image
                        src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                        height={"100%"}
                        alt={"library"}
                    />
                </Box>
                <Box flex={'1'} bg={'white'}>
                    <Text
                        fontWeight={"700"}
                        fontSize={"30px"}
                        textAlign={"center"}
                        mt={'100px'}
                    >
                        Hello Readers!
                    </Text>
                    <Box pr={'40px'} pl={'40px'} mt={{ lg: '100px' }} mb={'30px'}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl mt={'10px'} isInvalid={formik.errors.NIM}>
                                <FormLabel>NIM</FormLabel>
                                <Input
                                    type={'number'}
                                    placeholder={'Enter your NIM here'}
                                    value={formik.values.NIM}
                                    name="NIM"
                                    onChange={formChangeHandler}
                                />
                            </FormControl>
                            <FormControl mt={'10px'} isInvalid={formik.errors.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={'Enter your password here'}
                                        value={formik.values.password}
                                        name={'password'}
                                        onChange={formChangeHandler}
                                    />
                                    {/* <InputRightElement width={'4.5rem'}> */}
                                    <Button
                                        ml={'2px'}
                                        h={'39px'}
                                        size={'sm'}
                                        bg={'#2b2222'}
                                        onClick={togglePassword}
                                        color={'white'}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </Button>
                                    {/* </InputRightElement> */}
                                </InputGroup>
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>
                            <Button
                                mt={'30px'}
                                width={'100%'}
                                bg={'#271c16'}
                                color={'white'}
                                type={'submit'}
                            >
                                Login
                            </Button>
                            <FormErrorMessage>{formik.errors.NIM}</FormErrorMessage>
                        </form>
                        <Box textAlign={'right'}>
                            <Link to={'/register'}>
                                <Text fontSize={'smaller'} mt={'10px'}>
                                    Don't Have an Account yet?
                                </Text>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Flex >
        </Box >
    )
}

export default LoginPage