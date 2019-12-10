import { CompanyClient } from './companyClient.model';
import { Location } from './location.model';
import { PrivateClient } from './private-client.model';

export class Appointment {
  constructor(
    public id: number,
    public lieu: Location,
    public time: Date,
    public client: CompanyClient | PrivateClient,
    public status: string //pending, accepted or refused
  ) {}
}
