import { Box, Button, Flex, FormControl, Grid, GridItem, HStack, Image, Input, Select, Text } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../api"
import Book1 from "../assets/Book1.png"
import Book2 from "../assets/Book2.png"
import Book from "../component/Book"
import { fillCart } from "../redux/features/cartSlice"
import { fillTransaction } from "../redux/features/transactionSlice"

const Home = () => {

    const cartSelector = useSelector((state) => state.cart)

    const transactionSelector = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [sortDir, setSortDir] = useState("ASC")
    const [sortBy, setSortBy] = useState("id")
    const [filter, setFilter] = useState("")
    const [currentSearch, setCurrentSearch] = useState("")

    const fetchBooks = async () => {
        const maxItemsPerPage = 12
        try {
            const response = await axiosInstance.get('/books', {
                params: {
                    _page: page,
                    _limit: maxItemsPerPage,
                    _sortBy: sortBy,
                    _sortDir: sortDir,
                    genre: filter,
                    title: currentSearch,
                    // author: currentSearch
                }
            })

            setBooks(response.data.data)

            setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage))
        } catch (err) {
            console.log(err)
        }
    }

    // const fetchCart = async () => {
    //     try {
    //         const response = await axiosInstance.get("/carts")

    //         dispatch(fillCart(response.data.data))
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const fetchTransaction = async () => {
    //     try {
    //         const response = await axiosInstance.get('/transactions/me')

    //         dispatch(fillTransaction(response.data.data))
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: ({ search }) => {
            setCurrentSearch(search)
            setPage(1)
        },
    })

    const nextPage = () => {
        setPage(page + 1)
    }

    const previousPage = () => {
        setPage(page - 1)
    }

    const renderBooks = () => {
        return books.map((val) => {
            return (
                <Book
                    key={val.id.toString()}
                    title={val.title}
                    image_url={val.image_url}
                    author={val.author}
                    genre={val.Category.category_name}
                    publish_date={val.publish_date}
                    id={val.id}
                />
            )
        })
    }

    const sortBookHandler = ({ target }) => {
        const { value } = target

        setSortBy(value.split(" ")[0])
        setSortDir(value.split(" ")[1])
    }

    const filterBookHandler = ({ target }) => {
        const { value } = target

        setFilter(value)
    }


    const searchBookHandler = ({ target }) => {
        const { name, value } = target
        formik.setFieldValue(name, value)
    }

    useEffect(() => {
        fetchBooks()
        // fetchCart()
        // fetchTransaction()
    }, [page, sortBy, sortDir, filter, currentSearch])

    return (
        <>
            <Box marginTop="120px">
                <Grid
                    templateColumns={{
                        lg: "repeat(2, 1fr)",
                        md: "repeat(2, 1fr)",
                        base: "repeat(1, 1fr)",
                    }}
                    gap={6}
                >
                    <GridItem
                        fontSize={"50px"}
                        fontStyle="sans-serif"
                        fontWeight={"bold"}
                        textAlign={"center"}
                        ml={'220px'}
                    >
                        <Text>Welcome to <br /> KiraLib</Text>
                        <Flex justifyContent={"center"} mt={"20px"} mb={"40px"}>
                            <Image
                                objectFit={'cover'}
                                src={Book2}
                                alt={'book2'}
                                height={'270px'}
                                display={{ base: "none", lg: "initial" }}
                            />
                            <Image
                                obobjectFit={'cover'}
                                src={Book1}
                                alt={'book1'}
                                height={'250px'}
                                display={{ base: "40px" }}
                            />
                        </Flex>
                    </GridItem>
                    <GridItem padding={"30px 30px 30px 30px"} height="100%" ml={'100px'}>
                        <Grid templateRows=".2fr 1fr .2fr">
                            <GridItem></GridItem>
                            <GridItem>
                                <Box>
                                    <Text
                                        fontSize={"18px"}
                                        fontFamily="sans-serif"
                                        fontStyle={"Open Sans"}
                                        fontWeight="thin"
                                        marginTop={{ lg: "40px", base: "none", md: "none" }}
                                    >
                                        Get unlimited access to Kira's library of over <br />
                                        1,000,000 textbooks and non-fiction titles in <br />
                                        over 950 subtopics for the price of one.
                                    </Text>
                                    <Text fontWeight={"bold"}
                                        mt={'6px'}
                                        fontSize={'18px'}
                                    >
                                        Feel free to take a look at our collection of books.
                                    </Text>
                                </Box>
                                <a href="#ourbooks" className="page-scroll">
                                    <Button
                                        margin={"39px auto 0 0"}
                                        padding="16px 54px 17px 53px"
                                        backgroundColor={"#271c16"}
                                        color="white"
                                        borderRadius={"15px"}
                                    >
                                        See Our Collections
                                    </Button>
                                </a>
                            </GridItem>
                            <GridItem></GridItem>
                        </Grid>
                    </GridItem>
                </Grid>
            </Box>

            <Box backgroundColor={"#eff3f9"} height="auto" width={"fit-content"}>
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(1, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={6}
                    padding="6"
                >
                    {/* laptop */}
                    <GridItem display={{ base: "none", md: "none", lg: "flex" }}>
                        <Box my="auto" display={"flex"} marginX="auto">
                            <Box my="auto">
                                <Text fontSize={"18px"} fontWeight="semibold" mr={"2"}>
                                    Filter
                                </Text>
                            </Box>
                            <Box mr={'2'}>
                                <Select onChange={filterBookHandler}>
                                    <option value="">- filter -</option>
                                    <option value={"action"}>Action</option>
                                    <option value={"adventure"}>Adventure</option>
                                    <option value={"biography"}>Biography</option>
                                    <option value={"comedy"}>Comedy</option>
                                    <option value={"coming of age"}>Coming Of Age</option>
                                    <option value={"education"}>Education</option>
                                    <option value={"fantasy"}>Fantasy</option>
                                    <option value={"fiction"}>Fiction</option>
                                    <option value={"historical"}>Historical</option>
                                    <option value={"religion"}>Religion</option>
                                    <option value={"romance"}>Romance</option>
                                    <option value={"sci-fi"}>Sci-fi</option>
                                    <option value={"self-help book"}>Self-help book</option>
                                </Select>
                            </Box>

                            <Box
                                display={{ base: "none", md: "none", lg: "flex" }}
                                justifyContent={"right"}
                                my={"auto"}
                            >
                                <Text
                                    fontSize={"18px"}
                                    fontWeight="semibold"
                                    my={"auto"}
                                    mr="2"
                                >
                                    Sort
                                </Text>
                                <Select onChange={sortBookHandler}>
                                    <option value="id ASC">- sort -</option>
                                    <option value="title ASC">A - Z</option>
                                    <option value="title DESC">Z - A</option>
                                    <option value="publish_date DESC">Latest</option>
                                    <option value="publish_date ASC">Old</option>
                                </Select>
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Text
                            textAlign={"center"}
                            fontSize={"4xl"}
                            fontWeight={"bold"}
                            fontFamily="sans-serif"
                            justifyContent={"center"}
                            my={"auto"}
                            id="ourbooks"
                        >
                            Our Books
                        </Text>
                    </GridItem>
                    <GridItem display={"flex"}>
                        <Box display={"flex"} marginX="auto">
                            <Box display={"flex"} my={"auto"} mr="2">
                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl>
                                        <Input
                                            type={'text'}
                                            placeholder="Search title book here"
                                            width={'auto'}
                                            onChange={searchBookHandler}
                                            name="search"
                                            value={formik.values.search}
                                        />
                                        <Button
                                            mb={'8px'}
                                            ml={"1"}
                                            bgColor="#271c16"
                                            color={"white"}
                                        >
                                            Search
                                        </Button>
                                    </FormControl>
                                </form>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem></GridItem>
                    <GridItem>
                        <Grid
                            templateColumns={{
                                base: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)",
                                lg: "repeat(6, 1fr)",
                            }}
                            gap={4}
                            mt="15px"
                        >
                            {renderBooks()}
                        </Grid>
                        <Grid templateColumns="repeat(3, 1fr)" mt="15px">
                            <GridItem></GridItem>
                            <GridItem></GridItem>
                            <GridItem>
                                <HStack justifyContent={"end"} gap="2px">
                                    {page === 1 ? null : (
                                        <Button
                                            bgColor={"#271c16"}
                                            onClick={previousPage}
                                            color="white"
                                        >
                                            Prev
                                        </Button>
                                    )}

                                    {page >= maxPage ? null : (
                                        <Button
                                            bgColor={"#271c16"}
                                            color="white"
                                            onClick={nextPage}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </HStack>
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <GridItem></GridItem>
                </Grid>
            </Box>

            <Box
                backgroundColor={"#43615f"}
                backgroundImage={'https://img.freepik.com/premium-photo/grunge-wood-panels-texture_174699-4.jpg?w=2000'}
                textAlign={"center"}
                padding={"30px"}
                mt={"30px"}
            >
                <Text fontSize={"20px"} color="white" fontWeight={"bold"}>
                    <Text fontWeight={"light"}>Contact Us</Text>
                    <a
                        href={
                            "https://mail.google.com/mail/u/0/#inbox?compose=XBcJlJmnndWrdwHmRxmMRDJSBQFvQnCCpfhwBZdNFnTldsBKfkDvHRSSPsPzJmSBTmgxBGDbMcZCKKjQ"
                        }
                    >
                        kira.library@gmail.com
                    </a>
                </Text>

                <Text color={"white"}>Jl. Konoha Gakure</Text>
            </Box>
        </>
    )
}

export default Home