import { useEffect, useState } from "react";
import { Flex, Select, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();
  const { query } = router;

  const searchProperties = (filterValue) => {
    const path = router.pathname;

    const values = getFilterValues(filterValue);

    values.forEach((item) => {
      if (item.value && filterValue?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex bg={"gray.100"} justifyContent={"center"} flexWrap={"wrap"}>
      {filters.map((filter) => {
        if (
          query.purpose === "for-sale" &&
          filter.queryName === "rentFrequency"
        )
          return "";
        else
          return (
            <Box key={filter.queryName}>
              <Select
                placeholder={filter.placeholder}
                w={"fit-content"}
                p={2}
                onChange={(e) =>
                  searchProperties({ [filter.queryName]: e.target.value })
                }
                value={query[filter.queryName]}
              >
                {filter?.items?.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Box>
          );
      })}
    </Flex>
  );
};

export default SearchFilters;
