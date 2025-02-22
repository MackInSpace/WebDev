import { PARTNERS } from '../../app/shared/PARTNERS';

export const selectAllPartners = () => PARTNERS;

export const selectFeaturedPartner = () => {
    return PARTNERS.find((featuredPartner) => featuredPartner.featured);
};