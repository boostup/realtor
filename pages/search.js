import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";

import noresult from "../assets/images/noresult.svg";

import { fetchApi, baseUrl } from "../utils/fetchApi";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const { query } = useRouter();
  const purpose = query.purpose?.replace("-", " ");

  return (
    <Box>
      <Flex
        cursor={"pointer"}
        bg="gray.100"
        borderBottom={1}
        borderColor={"gray.200"}
        p={2}
        fontWeight={"black"}
        fontSize={"lg"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => setSearchFilters((prevFilter) => !prevFilter)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft={2} w={7} as={BsFilter}></Icon>
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize={"2xl"} p={4} fontWeight={"bold"}>
        Properties {purpose}
      </Text>
      <Flex flexWrap={"wrap"} justifyContent={"center"}>
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          marginTop={5}
          marginBottom={5}
        >
          <Image alt="no result" src={noresult} />
          <Text fontSize={"2xl"} marginTop={3}>
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const priceMin = query.priceMin || "0";
  const priceMax = query.priceMax || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMin = query.areaMin || "100";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&rentFrequency=${rentFrequency}&priceMin=${priceMin}&priceMax=${priceMax}&roomsMin=${roomsMin}&bathsMin=${bathsMin}&sort=${sort}&areaMin=${areaMin}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
