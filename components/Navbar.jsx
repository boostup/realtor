import Link from "next/link";
import { Flex, Box } from "@chakra-ui/react";
import MobileMenu from "./NavMenu/Mobile";
import MdAndUpMenu from "./NavMenu/MdAndUp";

const Navbar = () => (
  <Flex p={2} borderBottom={1} borderColor={"gray.100"}>
    <Box fontSize={"3xl"} color={"blue.400"} fontWeight={"bold"}>
      <Link href="/" paddingLeft={2}>
        Realtor
      </Link>
    </Box>
    <MobileMenu display={["block", "block", "none"]} />
    <MdAndUpMenu display={["none", "none", "flex"]} />
  </Flex>
);

export default Navbar;
