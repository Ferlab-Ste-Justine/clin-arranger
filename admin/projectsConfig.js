const GRAPHQL_FIELD_VARIANTS = "Variants";
const GRAPHQL_FIELD_ANALYSES = "Analyses";
const GRAPHQL_FIELD_SEQUENCINGS = "Sequencings";

const ENV = {
  dev: "development",
  staging: "staging",
  qa: "qa",
};

export const projectConfig = (projectId) =>
  [
    {
      env: ENV.dev,
      name: "test",
      indices: [
        {
          projectId,
          graphqlField: GRAPHQL_FIELD_ANALYSES,
          esIndex: "clin-qa-analyses",
        },
        {
          projectId,
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          esIndex: "clin_qa_variant_centric",
        },
        {
          projectId,
          graphqlField: GRAPHQL_FIELD_SEQUENCINGS,
          esIndex: "clin-qa-sequencings",
        },
      ],
      extendedMappingMutations: [
        {
          field: "genes_symbol",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.is_hc",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.is_possibly_hc",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "consequences.consequences",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.filters",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "clinvar.clin_sig",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "clinvar.conditions",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "clinvar.inheritance",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.mother_calls",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.father_calls",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.hc_complement",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.hc_complement.locus",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.possibly_hc_complement",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.possibly_hc_complement.count",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "donors.possibly_hc_complement.symbol",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "genes.omim.inheritance",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "panels",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "varsome.acmg.classifications",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "varsome.acmg.classifications.user_explain",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "consequences.refseq_mrna_id",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "varsome.publications",
          graphqlField: GRAPHQL_FIELD_VARIANTS,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
        {
          field: "sequencing_requests",
          graphqlField: GRAPHQL_FIELD_ANALYSES,
          projectId,
          extendedFieldMappingInput: {
            isArray: true,
          },
        },
      ],
    },
  ].find((p) => p.name === projectId);