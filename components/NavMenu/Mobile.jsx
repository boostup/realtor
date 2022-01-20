import React from "react";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import menuData from "../../utils/menuData";

const menuItemIcons = {
  FcHome: <FcHome />,
  BsSearch: <BsSearch />,
  FiKey: <FiKey />,
};

const Mobile = (props) => (
  <>
    <Spacer {...props} />
    <Box {...props}>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FcMenu />}
          variant={"outlined"}
          color={"red.400"}
        />
        <MenuList>
          {menuData.map((item) => (
            <Link key={item.url} href={item.url} passHref>
              <MenuItem icon={menuItemIcons[item.iconName]}>
                {item.label}
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </Box>
  </>
);

export default Mobile;
