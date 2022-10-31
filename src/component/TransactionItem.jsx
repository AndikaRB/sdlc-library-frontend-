import { Box, Image, Text } from "@chakra-ui/react"


const TransactionItem = ({ title, author, genre, publish_date, image_url }) => {

    return (
        <Box
            height={"auto"}
            backgroundColor={"white"}
        // borderRadius="15px"
        // mb="4"
        // p={"4"}
        >
            <Box
                fontSize={"16px"}
                display={{ base: "block", md: "flex", lg: "flex" }}
                mx="10px"
                border={'2px #71553E solid'}
                my={'5px'}
            >
                <Image

                    height="70px"
                    width={"60px"}
                    // mx={{ base: "auto", md: "0", lg: "0" }}
                    src={
                        image_url ||
                        "https://cdn.gramedia.com/uploads/items/9786024246945_Laut-Bercerita.jpg"
                    }
                    mb={'5px'}
                    mt={'5px'}
                    ml={'5px'}
                />
                <Box ml={"30px"} my="auto">
                    <Text fontSize={"20px"}>
                        {title}
                    </Text>
                    <Text fontWeight={"normal"} fontSize={"14px"}>
                        {author}
                    </Text>
                    {/* <Text fontWeight={"normal"} fontSize={"15px"}>
                        {genre}
                    </Text>
                    <Text fontWeight={"normal"} fontSize={"15px"}>
                        {publish_date} */}
                    {/* </Text> */}
                </Box>
            </Box>
        </Box >
    )
}

export default TransactionItem