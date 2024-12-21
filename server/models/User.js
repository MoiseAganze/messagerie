const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\d{10,15}/.test(v); // Validation pour les numéros de téléphone
        },
        message: (props) =>
          `${props.value} n'est pas un numéro de téléphone valide !`,
      },
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Rend le champ facultatif tout en maintenant l'unicité
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "default_avatar.png", // Par défaut, une image avatar
    },
    status: {
      type: String,
      default: "Disponible", // Statut par défaut de l'utilisateur
    },
    contacts: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        nickname: String, // Surnom pour un contact
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    chats: [
      {
        chatId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Chat",
        },
        lastMessage: String,
        unreadCount: {
          type: Number,
          default: 0,
        },
      },
    ],
    blockedContacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    settings: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// Middleware avant la sauvegarde pour hasher le mot de passe
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporter le modèle
module.exports = mongoose.model("User", UserSchema);
