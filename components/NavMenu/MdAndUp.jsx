import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Spacer, HStack } from "@chakra-ui/react";
import menuData from "../../utils/menuData";

const MdAndUp = (props) => {
  const router = useRouter();
  const { query } = router;
  return (
    <>
      <Spacer {...props} />
      <HStack {...props} spacing="24px">
        {menuData.map((item) => (
          <Box
            key={item.url}
            borderBottom={
              query.purpose === item.queryValue ? "medium solid black" : ""
            }
          >
            <Link href={item.url} passHref>
              {item.label}
            </Link>
          </Box>
        ))}
      </HStack>
    </>
  );
};

export default MdAndUp;
