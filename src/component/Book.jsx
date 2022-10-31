import { Box, Button, Grid, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../api"
import { addItemTocart } from "../redux/features/cartSlice"


const Book = ({ title, image_url, author, genre, publish_date, id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams()
    const toast = useToast()
    const dispatch = useDispatch()

    const [bookId, setBookId] = useState(0)
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        publish_date: 0,
        genre: "",
        image_url: "",
        description: "",
        id: "",
    })

    const fetchBookById = async () => {
        try {
            const response = await axiosInstance.get(`/books/${id}`)

            setBookData(response.data.data)
            setBookId(response.data.data.id)

        } catch (err) {
            console.log(err)
        }
    }

    const addToCartBtnHandler = async () => {
        try {
            let addToCart = {
                BookId: bookId
            }

            console.log(bookId)
            const response = await axiosInstance.post(`/carts`, addToCart)
            fetchBookById()

            dispatch(addItemTocart(response.data.data))

            toast({
                title: "Add success",
                status: "success",
            })
        } catch (err) {
            console.log(err)
            toast({
                title: "Add failed",
                status: "error",
                description: err.response.data.message,
            })
        }
    }

    useEffect(() => {
        fetchBookById();
    }, [])

    return (
        <Box
            onClick={() => {
                onOpen();
            }}
        >
            <Box
                width={"200px"}
                height={"340"}
                backgroundColor={"white"}
                borderRadius="15px"
                cursor={'pointer'}
            >
                <Image
                    height="200px"
                    width={"100%"}
                    objectFit="cover"
                    src={
                        image_url ||
                        "https://e7.pngegg.com/pngimages/81/458/png-clipart-spongebob-squarepants-plankton-s-robotic-revenge-spongebob-squarepants-creature-from-the-krusty-krab-spongebob-s-truth-or-square-plankton-and-karen-mr-krabs-plankton-s-face-leaf-thumbnail.png"
                    }
                    borderTopRadius="15px"
                />
                <Box height={"70px"}>
                    <Text padding={"2"} fontSize="18px">
                        {title}
                    </Text>
                </Box>
                <Box>
                    <Text paddingLeft={"2"} fontWeight="bold" fontSize="15px">
                        {genre}
                    </Text>
                    <Text paddingLeft={"2"} fontSize="13px">
                        {author}
                    </Text>
                    <Text paddingLeft={"2"} fontSize="13px">
                        {publish_date}
                    </Text>
                </Box>
                <>
                    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
                        <ModalOverlay
                            bg="blackAlpha.300"
                            backdropFilter="blur(10px) hue-rotate(90deg)"
                        />
                        <ModalOverlay />
                        <ModalContent h="600px">
                            <ModalHeader textAlign={"center"} fontSize="3xl" as={"b"}>
                                Details Book
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Grid
                                    gridTemplateRows={"50px 2fr 30px"}
                                    gridTemplateColumns={"150px 2fr"}
                                >
                                    <GridItem pl={2}>
                                        <Image
                                            boxSize="450px"
                                            maxWidth={"300px"}
                                            src={bookData?.image_url}
                                        />
                                    </GridItem>
                                    <GridItem pl={"30%"}>
                                        <Box>
                                            <Text fontSize={"xl"} as="b">
                                                Title
                                            </Text>
                                            <Text> {bookData?.title}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize={"xl"} as="b">
                                                Author
                                            </Text>
                                            <Text>{bookData?.author}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize={"xl"} as="b">
                                                Publish Date
                                            </Text>
                                            <Text>{bookData?.publish_date}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize={"xl"} as="b">
                                                Genre
                                            </Text>
                                            <Text>{bookData?.genre}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize={"xl"} as="b">
                                                Description
                                            </Text>
                                            <Box mr={'20px'}>
                                                <Text textAlign="justify">
                                                    {/* {bookData?.description} */}
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia omnis eligendi nemo quos corporis quo iste architecto placeat magnam consectetur, odio doloribus vitae perspiciatis iure voluptas animi reprehenderit pariatur facere! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ratione ipsam magni libero fuga perferendis, a id odit facere, saepe modi delectus pariatur nemo repellendus atque assumenda quia quam aut.
                                                </Text>
                                            </Box>
                                        </Box>
                                    </GridItem>
                                </Grid>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    size={"sm"}
                                    bgColor="#43615f"
                                    color="white"
                                    onClick={addToCartBtnHandler}
                                >
                                    <Text>Add to Cart</Text>
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            </Box>
        </Box>
    )
}

export default Book