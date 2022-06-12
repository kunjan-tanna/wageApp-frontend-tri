import {IOfferBiddersList} from "../../../../../../modules/OfferBidders/types";

export interface IProps {
    data: IOfferBiddersList;
    selectHandler: () => void;
}