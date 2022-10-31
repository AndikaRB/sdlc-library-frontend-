import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Image, Input, InputGroup, Text, useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "../api"
import * as Yup from 'yup'

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            username: "",
            NIM: "",
            email: "",
            password: ""
        },
        onSubmit: async ({ username, NIM, email, password }) => {
            try {
                const response = await axiosInstance.post("/auth/register", {
                    username,
                    NIM,
                    email,
                    password
                })
                toast({
                    title: "Registration Successful",
                    description: response.data.message,
                    status: "success",
                });
                formik.setFieldValue("username", "")
                formik.setFieldValue("NIM", "")
                formik.setFieldValue("email", "")
                formik.setFieldValue("password", "")
            } catch (err) {
                console.log(err)
                toast({
                    title: "Registration Failed",
                    description: err.response.data.message,
                    status: "error",
                });
            }
        },
        validationSchema: Yup.object({
            username: Yup.string().required().min(3),
            NIM: Yup.number().required(),
            email: Yup.string().required().email(),
            password: Yup.string()
                .required()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
        }),
        validateOnChange: false,
    })

    const formChangeHandler = ({ target }) => {
        const { name, value } = target;
        formik.setFieldValue(name, value)
    }

    return (
        <Box bg={"lightgray"} p={"100px 40px 40px 40px"}>
            <Flex
                direction={{
                    base: "column",
                    md: "column",
                    lg: "row"
                }}>
                <Box flex={'1'}>
                    <Image
                        src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                        height={'100%'}
                        alt={'library'}
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
                    <Box pr={'40px'} pl={'40px'} mt={'40px'} mb={'25px'}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl isInvalid={formik.errors.username}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type={'text'}
                                    placeholder={'Enter your username here'}
                                    value={formik.values.username}
                                    name={'username'}
                                    onChange={formChangeHandler}
                                />
                                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl mt={'10px'} isInvalid={formik.errors.NIM}>
                                <FormLabel>NIM</FormLabel>
                                <Input
                                    type={'text'}
                                    placeholder={'Enter your NIM here'}
                                    value={formik.values.NIM}
                                    name={'NIM'}
                                    onChange={formChangeHandler}
                                />
                                <FormErrorMessage>{formik.errors.NIM}</FormErrorMessage>
                            </FormControl>
                            <FormControl mt={'10px'} isInvalid={formik.errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type={'text'}
                                    placeholder={'Enter your email here'}
                                    value={formik.values.email}
                                    name={'email'}
                                    onChange={formChangeHandler}
                                />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
                                    <inputRightElement width={'4.5rem'}>
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
                                    </inputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>
                            <Button
                                mt={'25px'}
                                width={'100%'}
                                bg={'#271c16'}
                                color={'white'}
                                type={'submit'}
                            >
                                Register
                            </Button>
                            <Box textAlign={'right'}>
                                <Link to={'/login'}>
                                    <Text fontSize={'smaller'} mt={'10px'}>
                                        Already Have an Account?
                                    </Text>
                                </Link>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default RegisterPage

