import { ISuggestionModalState } from "@domain/entities/SuggestionEntity";

type ISuggestionForm = {
  [key in ISuggestionModalState["type"]]: {
    [key in "en" | "id"]: {
      title: string;
      fields: {
        name: string;
        label: string;
        type: string;
        placeholder: string;
        rules: {
          required: string;
        };
      }[];
    };
  };
};

const suggestionForm: ISuggestionForm = {
  customer: {
    en: {
      title: "Add Customer",
      fields: [
        {
          name: "mobile_phone",
          label: "Mobile Phone",
          type: "text",
          placeholder: "Enter mobile phone",
          rules: {
            required: "Mobile phone is required",
          },
        },
        {
          name: "nama",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Pelanggan",
      fields: [
        {
          name: "mobile_phone",
          label: "Nomor HP",
          placeholder: "Masukkan nomor HP",
          type: "text",
          rules: {
            required: "Nomor HP harus diisi",
          },
        },
        {
          name: "nama",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  final_identification: {
    en: {
      title: "Add Identification",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Identifikasi",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan name",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  cut: {
    en: {
      title: "Add Cut",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Cut",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  shape: {
    en: {
      title: "Add Shape",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Bentuk",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  color: {
    en: {
      title: "Add Color",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Warna",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  comment: {
    en: {
      title: "Add Comment",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Komentar",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  origin: {
    en: {
      title: "Add Origin",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Asal",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  clarity: {
    en: {
      title: "Add Clarity",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Kekerasan",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
  transparency: {
    en: {
      title: "Add Transparency",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter name",
          rules: {
            required: "Name is required",
          },
        },
      ],
    },
    id: {
      title: "Tambah Transparansi",
      fields: [
        {
          name: "name",
          label: "Nama",
          placeholder: "Masukkan nama",
          type: "text",
          rules: {
            required: "Nama harus diisi",
          },
        },
      ],
    },
  },
};

export default suggestionForm;
