import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

/**
 * A cleaner representation of a symbol from an Alpha Vantage search.
 * @see https://www.alphavantage.co/documentation/#symbolsearch
 */
@Entity()
export class Symbol {
    @Column()
    currency: string;

    /**
     * Although the symbol is technically the ID, TypeORM requires a UUID.
     * @see https://github.com/typeorm/typeorm/issues/2530
     */
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    marketClose: string;

    @Column()
    marketOpen: string;

    @Column()
    name: string;

    @Column()
    region: string;

    @Column()
    symbol: string;

    @Column()
    timezone: string;

    @Column()
    type: string;
}
