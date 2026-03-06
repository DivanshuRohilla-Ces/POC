import { render, screen } from "@testing-library/react";
import Sidebar from "../sidebar";
import { Users } from "../../app/types";
import "@testing-library/jest-dom";

const mockUser: Users = {
  "address": {
    "address": "626 Main Street",
    "city": "Phoenix",
    "state": "Mississippi",
    "stateCode": "MS",
    "postalCode": "29112",
    "coordinates": {},
    "country": ""
  },
  "age": 29,
  "bank": {
    "cardExpire": "05/28",
    "cardNumber": "3693233511855044",
    "cardType": "Diners Club International",
    "currency": "GBP",
    "iban": "GB74MH2UZLR9TRPHYNU8F8"
  },
  "birthDate": "1996-5-30",
  "bloodGroup": "O-",
  "company": {
    "department": "Engineering",
    "name": "Dooley, Kozey and Cronin",
    "title": "Sales Manager",
    "address": {}
  },
  "crypto": {
    "coin": "Bitcoin",
    "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
    "network": "Ethereum (ERC20)"
  },
  "ein": "977-175",
  "email": "emily.johnson@x.dummyjson.com",
  "eyeColor": "Green",
  "firstName": "Emily",
  "gender": "female",
  "hair": {
    "color": "Brown",
    "type": "Curly"
  },
  "height": 193.24,
  "id": 1,
  "image": "https://dummyjson.com/icon/emilys/128",
  "ip": "42.48.100.32",
  "lastName": "Johnson",
  "macAddress": "47:fa:41:18:ec:eb",
  "maidenName": "Smith",
  "password": "emilyspass",
  "phone": "+81 965-431-3024",
  "role": "admin",
  "ssn": "900-590-289",
  "university": "University of Wisconsin--Madison",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
  "username": "emilys",
  "weight": 63.16
};

describe("Sidebar Component", () => {
  test("renders user details", () => {
    render(<Sidebar user={mockUser} />);

    expect(screen.getByText("User Details")).toBeInTheDocument();
    expect(screen.getByText("Emily")).toBeInTheDocument();
    expect(screen.getByText("Johnson")).toBeInTheDocument();
  });

  test("renders user image", () => {
    render(<Sidebar user={mockUser} />);

    const img = screen.getByAltText("https://dummyjson.com/icon/emilys/128");
    expect(img).toBeInTheDocument();
  });
});

