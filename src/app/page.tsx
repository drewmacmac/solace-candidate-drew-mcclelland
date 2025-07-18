"use client";

import {ChangeEvent, useEffect, useState} from "react";
import {Advocate, AdvocateApiResult} from "@/app/models/advocate.models";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // TODO: Strict tsc settings still complain about this not being awaited.
    // But the internet says this is the right thing to do. What's the right way to do this?
    setUpAdvocates()
  }, []);

  const setUpAdvocates = async (): Promise<void> => {
    try {
      const advocateResponse = await fetch("/api/advocates")
      // TODO: `as AdvocateApiResult` is not good. We should use a validation/parsing library,
      // Or ask a TS/Next expert what the right thing to do is
      const result = await advocateResponse.json() as AdvocateApiResult
      const advocatesArr = result.data;
      setAdvocates(advocatesArr)
      setFilteredAdvocates(advocatesArr)
    } catch (error) {
      // TODO: Introduce logging library and standardize to JSON format
      console.error("Error fetching advocates", error);
      // TODO: Figure out how to gracefully handle error. Display user friendly message?
      throw error;
    }
  }

  // TODO: add debouncing here to make more performant
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    performSearch(e.target.value);
  };

  const performSearch = (inputSearchTerm: string) => {
    setSearchTerm(inputSearchTerm);
    if (inputSearchTerm === "") {
      setFilteredAdvocates(advocates);
    } else {
      // TODO move these to the DB
      const filteredAdvocates = advocates.filter((advocate) => {
        const searchableFields = [
          advocate.firstName,
          advocate.lastName,
          advocate.city,
          advocate.degree,
          advocate.specialties,
          advocate.yearsOfExperience,
        ]
        // TODO: Do we want case insensitive search?
        const searchableFieldsLowered = searchableFields.map(s => s.toString().toLowerCase())
        const inputSearchTermLowered = inputSearchTerm.toLowerCase();
        return searchableFieldsLowered.some(field => field.includes(inputSearchTermLowered))
      });

      setFilteredAdvocates(filteredAdvocates);
    }
  }

  return (
    // TODO: Separate these into separate components
    <main style={{margin: "24px"}}>
      <h1>Solace Advocates</h1>
      <br/>
      <br/>
      <div>
        <p>Search</p>
        <p>
          Searching for: {searchTerm}
        </p>
        <input value={searchTerm} style={{border: "1px solid black"}} onChange={onSearchChange}/>
        <button onClick={() => {
          performSearch("");
        }}>Reset Search
        </button>
      </div>
      <br/>
      <br/>
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
        </thead>
        <tbody>
        {filteredAdvocates.map((advocate) => {
          return (
            <tr key={advocate.id}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {/* TODO: is the specialty safe to use an a React key? (e.g. are they unique?)*/}
                {advocate.specialties.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </main>
  );
}
