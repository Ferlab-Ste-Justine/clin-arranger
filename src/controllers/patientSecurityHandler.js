import EsInstance from "../services/esClient.js";
import {
  extractReadPermissions,
  extractSecurityTags,
  haveNonEmptyTagsIntersection,
} from "../permissionsUtils.js";
import { rsPatient, indexNameSequencings } from "../config/vars.js";
import { sendBadRequest, sendForbidden } from "../httpUtils.js";
import jwt_decode from "jwt-decode";

const maxLength = 50;

const regexOnlyAlphaNumeric = /^[a-z0-9]+$/i;

const validatePatientInput = (pId) =>
  typeof pId === "string" &&
  maxLength > pId.length &&
  pId.length > 0 &&
  regexOnlyAlphaNumeric.test(pId);

const extractPatientSecurityTags = (esResponse) =>
  esResponse?.body?.hits?.hits?.[0]?._source?.security_tags || [];

export default async (req, res, next) => {
  const patientId = req.params.patientId;
  const inputsAreInvalid = !validatePatientInput(patientId);
  if (inputsAreInvalid) {
    return sendBadRequest(res);
  }

  const decodedToken = jwt_decode(req.headers.authorization);
  const readPermissions = extractReadPermissions(decodedToken, [rsPatient]);
  const cannotReadPatient = !readPermissions.includes(rsPatient);
  if (cannotReadPatient) {
    return sendForbidden(res);
  }

  const client = EsInstance.getInstance();
  const response = await client.search({
    index: indexNameSequencings,
    body: {
      query: {
        term: {
          patient_id: patientId,
        },
      },
    },
  });

  const pSecurityTags = extractPatientSecurityTags(response);
  const userSecurityTags = extractSecurityTags(decodedToken);
  const canSeePatient = haveNonEmptyTagsIntersection(
    pSecurityTags,
    userSecurityTags
  );
  if (!canSeePatient) {
    return sendForbidden(res);
  }

  next();
};
