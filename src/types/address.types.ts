export type Address = {
  id: number;
  zip_code: string;
  neighborhood: string;
  public_place: string;
  city: string;
  state: string;
  complement: string;
  address_number: number;
};

export type CommonAddressRequest = {
  page: number;
  perPage: number;
};
